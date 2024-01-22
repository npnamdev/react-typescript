type GreetProps = {
    name: string
    messageCount?: number
    isLoggedIn: boolean
}

const Greet = (props: GreetProps) => {
    const {name, messageCount = 0, isLoggedIn} = props;
    return(
       <div>
           {
            isLoggedIn ? <h2>Welcome {name}! You have {messageCount} unread messages</h2> : <h2>No Data</h2>
            } 
       </div>
    )
}

export default Greet;