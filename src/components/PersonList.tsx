import { Name } from "./Person.type"

type PersonListProps = {
    names: Name[]
}

const PersonList = (props: PersonListProps) => {
    return(
        <div>
            {props.names.map(item =>(
                <h5>{item.first} : {item.last}</h5>
            ))}
        </div>
    )
}

export default PersonList;