'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSidebar() {
    const { cartItems, removeFromCart, updateQuantity, getWhatsAppLink } = useCart();

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                    <span className="sr-only">Abrir carrito</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:w-[450px]">
                <SheetHeader>
                    <SheetTitle className="font-headline text-2xl">Tu Carrito</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-hidden mt-8">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-full pr-4">
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedImage}`} className="flex gap-4">
                                        <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary/20 flex-shrink-0">
                                            <img
                                                src={item.selectedImage || item.product.images[0]}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                                                <p className="text-sm text-muted-foreground">{item.product.category}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t">
                    <Button
                        className="w-full gap-2"
                        size="lg"
                        disabled={cartItems.length === 0}
                        onClick={() => window.open(getWhatsAppLink(), '_blank')}
                    >
                        <MessageCircle className="h-5 w-5" />
                        Completar pedido por WhatsApp
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Serás redirigido a WhatsApp para finalizar la compra con un agente.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
