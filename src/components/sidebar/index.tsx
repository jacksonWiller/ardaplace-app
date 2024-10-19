import{ Sheet, SheetTrigger, SheetContent} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, LogOut, Package, PanelBottom, Settings, ShoppingBag, Users } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent  } from '@/components/ui/tooltip';

export function Sidebar() {
  return (
   <div className="flex w-full flex=col bg-muted/40 " >
        <aside
            className="fixed inset-y-0 left-0 z-0 hidden w-14 border-r bg-background sm:flex flex-col" 
        >
            <nav className="flex flex-col items-center gap-4 px-2 py-5">
                <TooltipProvider>
                    <Link 
                    href="#" 
                    className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary
                    text-primary-foreground rounded-full"
                    >
                        <Package className="h-4 w-4"/>
                        <span className="sr-only">Logo do projeto</span>   
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <Home className="h-4 w-4"/>
                                <span className="sr-only">Home</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Home</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <ShoppingBag className="h-4 w-4"/>
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <Package className="h-4 w-4"/>
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <Users className="h-4 w-4"/>
                                <span className="sr-only">Costumers</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Costumers</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <Settings className="h-4 w-4"/>
                                <span className="sr-only">Configurations</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Configurations</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>

            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg
                            text-muted-foreground transition-colors hover:text-foreground">
                                <LogOut className="h-4 w-4"/>
                                <span className="sr-only">LogOut</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">LogOut</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>

        <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className='sticky top-0 z-30 flex h-14 items-center px-4 border-b 
            bg-background gap-4 
                sm:static sm:h-auto sm:border-0 ms:bg-transparent sm:px-6' 
            >
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" >
                            <PanelBottom className='' />
                                <span className='sr-only'> Open/Close </span> 
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="sm:max-w-x">
                        <nav className="grid gap-6 text-lg font-medium">

                            <Link href="#" className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center 
                            text-background md:text-base gap-2" 
                            prefetch={false}>

                                <Package className="h-5 w-5" transition-all />
                                <span className="sr-only">Logo do projeto</span>
                                
                            </Link>

                            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" 
                            prefetch={false}>

                                <Home className="h-5 w-5" transition-all />
                                Home

                            </Link>

                            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" 
                            prefetch={false}>

                                <ShoppingBag className="h-5 w-5" transition-all />
                                Orders

                            </Link>

                            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" 
                            prefetch={false}>

                                <Package className="h-5 w-5" transition-all />
                                Products

                            </Link>

                            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" 
                            prefetch={false}>

                                <Users className="h-5 w-5" transition-all />
                                Costumers

                            </Link>

                            <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" 
                            prefetch={false}>

                                <Settings className="h-5 w-5" transition-all />
                                Configurations

                            </Link>
                        </nav>
                    </SheetContent>

                </Sheet>
            </header>
        </div>
   </div>
  );
}