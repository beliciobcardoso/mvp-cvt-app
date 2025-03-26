'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { tuple, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Separator } from "../ui/separator"
import { useState } from "react"

const formSchema = z.object({
    city: z.string().min(3).max(50),
    ticketValue: z.coerce.number().min(0),
    ticketsPerDay: z.coerce.number().min(2).max(10),
})

type FormSchema = z.infer<typeof formSchema>

export function CalendarConfig() {
    const [openDialog, setOpenDialog] = useState(false)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city: "Salvador",
            ticketValue: 5.2,
            ticketsPerDay: 2,
        },
    })

    function onSubmit(data: FormSchema) {
        console.log(data)
        setOpenDialog(false)
        localStorage.setItem("calendarConfig", JSON.stringify(data))
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpenDialog(true)} >Configuração</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configuração</DialogTitle>
                    <DialogDescription>
                        Configure os dados do transporte da sua cidade.
                        <Separator className="my-4" />
                        <Label className="text-sm text-muted-foreground">
                            Você pode configurar os dados do calendário, como o valor do transporte, a cidade e a quantidade de transportes por dia.
                            <br />
                            <span className="text-red-500">Atenção:</span> Os dados são salvos apenas na memória do seu navegador, não são persistidos em nenhum lugar.
                            <br />
                            Para mais informações, <a href="#" className="text-blue-600">click aqui.</a>
                        </Label>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Salvador" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Insira o nome da cidade!
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ticketValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor da Transporte</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5,20" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Insira o valor da passagem!
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ticketsPerDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transporte por dia</FormLabel>
                                        <FormControl>
                                            <Input placeholder="02" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Insira a quantidade de transporte por dia!
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
