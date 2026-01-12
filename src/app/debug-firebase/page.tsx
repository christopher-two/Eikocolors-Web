'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default function DebugFirebasePage() {
    const [status, setStatus] = useState<string>('Probando conexión...');
    const [envCheck, setEnvCheck] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    const [docs, setDocs] = useState<any[]>([]);

    useEffect(() => {
        // 1. Check Env Vars (safe check, don't reveal full secrets)
        const checkEnv = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Configurado (OK)' : 'Faltante (ERROR)',
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Configurado (OK)' : 'Faltante (ERROR)',
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Configurado (OK)' : 'Faltante (ERROR)',
        };
        setEnvCheck(checkEnv);

        // 2. Try Connection
        const testConnection = async () => {
            try {
                // Intenta leer de la colección 'products' o 'categories'
                // Usamos 'categories' es más probable que exista y sea publica
                const q = query(collection(db, 'categories'), limit(1));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    // Si categories está vacía, intentamos products
                    const q2 = query(collection(db, 'products'), limit(1));
                    const snapshot2 = await getDocs(q2);
                    if (snapshot2.empty) {
                        setStatus('Conectado a Firebase, pero no se encontraron documentos en "categories" ni "products".');
                    } else {
                        setStatus(`¡Conexión Exitosa! Encontrado producto ID: ${snapshot2.docs[0].id}`);
                        setDocs(snapshot2.docs.map(d => d.data()));
                    }
                } else {
                    setStatus(`¡Conexión Exitosa! Encontrada categoría ID: ${snapshot.docs[0].id}`);
                    setDocs(snapshot.docs.map(d => d.data()));
                }
            } catch (err: any) {
                console.error("Error validando firebase:", err);
                setError(err.message || JSON.stringify(err));
                setStatus('Fallo la conexión.');
            }
        };

        if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
            testConnection();
        } else {
            setStatus('No se puede probar conexión: Faltan variables de entorno.');
        }

    }, []);

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8 font-sans">
            <h1 className="text-2xl font-bold">Diagnóstico de Firebase en Despliegue</h1>

            <div className="p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-900">
                <h2 className="font-semibold mb-4">1. Variables de Entorno (Client Side)</h2>
                <ul className="space-y-2 text-sm font-mono">
                    {Object.entries(envCheck).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span className={String(value).includes('ERROR') ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>
                                {String(value)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-900">
                <h2 className="font-semibold mb-4">2. Prueba de Conexión (Firestore)</h2>
                <div className={`p-2 rounded ${error ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    <strong>Estado:</strong> {status}
                </div>
                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded overflow-auto">
                        <p className="font-bold text-red-700">Detalle del Error:</p>
                        <pre className="text-xs mt-2 whitespace-pre-wrap text-red-600">{error}</pre>
                    </div>
                )}
            </div>

            {docs.length > 0 && (
                <div className="p-4 border rounded shadow-sm">
                    <h3 className="font-semibold mb-2">Datos de Muestra Recuperados:</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(docs, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
