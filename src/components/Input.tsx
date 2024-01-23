type InputProps = {
    value: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Input = (props: InputProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    }
    return (
        <input className="border border-black" type="text" value={props.value} onChange={handleInputChange}/>
    );
};

export default Input;