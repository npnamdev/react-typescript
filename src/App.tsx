import Button from "./components/Button";
import Container from "./components/Container";
import Greet from "./components/Greet";
import Heading from "./components/Heading";
import Oscar from "./components/Oscar";
import Person from "./components/Person";
import PersonList from "./components/PersonList";
import Status from "./components/Status";

const App = () => {
  const personName = {
    first: 'Nam',
    last: 'Đẹp trai hehe'
  };

  const nameList = [
    {
      first: 'Nam',
      last: 'Đẹp trai hehe'
    },
    {
      first: 'Yến',
      last: 'Ngu'
    },
    {
      first: 'Lương',
      last: 'Bịp'
    },
  ]

  return (
    <main className="">
      <Greet name="Nam Đẹp trai" messageCount={15} isLoggedIn={true} />
      <Person name={personName}/>
      <PersonList names={nameList}/>
      <Status status="success"/>
      <Oscar>
        <Heading>Nam đẹp trai</Heading>
      </Oscar>
      <Greet name="đang test" isLoggedIn={true} />
      <Button handleClick={(event, id) => console.log('Button clicked: ', event, id)}/>
      <Container styles={{border: '1px solid black', padding: '1rem'}}/>
    </main>
  )
}

export default App;