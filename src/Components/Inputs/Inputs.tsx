import type { FormEvent } from "react"

interface InputsProps {
    city: (cityName: string) => void
}

const Inputs = ({ city }: InputsProps) => {
    return (
        <div>
            <form className="flex flex-col ">
                <input
                    placeholder="Ciudad..."
                    type="text"
                    className="bg-white my-3 w-[20dvw] h-[2dvw] rounded-2xl text-black p-2 placeholder:text-neutral-500"
                    onSubmit={(event: FormEvent) => {
                        event.preventDefault()
                        city(event.target.value)
                    }}
                />
            </form>
        </div>
    )
}

export default Inputs