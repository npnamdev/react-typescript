import Greet from "./components/Greet";
import Heading from "./components/Heading";
import Oscar from "./components/Oscar";
import Person from "./components/Person";
import PersonList from "./components/PersonList";
import Status from "./components/status";

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
    <main>
      <Greet name="Nam Đẹp trai" messageCount={15} isLoggedIn={true} />
      <Person name={personName}/>
      <PersonList names={nameList}/>
      <Status status="success"/>
      <Oscar>
        <Heading>Nam đẹp trai</Heading>
      </Oscar>
      <Greet name="đang test" isLoggedIn={true} />
    </main>
  )
}

export default App;