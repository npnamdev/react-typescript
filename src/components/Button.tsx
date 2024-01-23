import Input from "./Input";

type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
};

const Button = (props: ButtonProps) => {
    return (
        <div>
            <button onClick={event => props.handleClick(event, 1)}>Button</button>
            <Input value="" handleChange={event => console.log(event)}/>
        </div>
    );
};

export default Button;