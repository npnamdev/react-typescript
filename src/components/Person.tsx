interface PersonProps {
    name: {
        first: string
        last: string
    }
}

const Person = (props: PersonProps) => {
    return(
       <div>   
         {props.name.first} and {props.name.last} 
       </div>
    )
}

export default Person;