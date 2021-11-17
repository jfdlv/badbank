import Card from '../../util/card';
export default function Home() {

  return (
    <Card
    bgcolor="secondary"
    header="Welcome to the bank"
    body={
      <>
        <p>For all your banking needs</p>
        <div>
          <img src='./bankicon.png' alt="wat" width="100%"/>
        </div>
      </>
    }
    />
  )
}