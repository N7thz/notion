import { ComponentProps, ReactNode } from "react"

interface BubbleButtonProps extends ComponentProps<"button"> {

    children: ReactNode
}

export const BubbleButton = (props: BubbleButtonProps) => {

    return (

        <button
            className="p-2 text-zinc-500 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-900 hover:bg-zinc-100 
            data-[active=true]:text-violet-500"
            {...props}
        />
    )
}
