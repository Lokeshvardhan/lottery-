import './App.css';
import { useEffect,useState } from 'react';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager]  =useState();
  const [players, setPlayers] =useState([]);
  const [balance, setBalance] = useState('');
  const [ether, setEther] = useState('');
  const [message, setMessage] = useState('');
  useEffect(()=>{
    const getManager = async() =>{
      const managerContract = await lottery.methods.manager().call();
      //console.log('manager', managerContract);
      setManager(managerContract);
      const playersContract = await lottery.methods.getPlayers().call();
      const balanceContract = await web3.eth.getBalance(lottery.options.address);
      //console.log(balanceContract);
      setBalance(balanceContract);
      setPlayers(playersContract);
    }
    getManager();
  },[]);
  const onSubmit = async(event)=>{
    
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for transaction to complete...');
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ether,'ether') 
    });
    setMessage('Your transaction is complete');
  };
  const onClick = async()=>{
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for transaction to complete...');
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMessage('Your transaction is complete');
  };
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managd by {manager}</p>
      <p>There are currently {players.length} people entered ,
        competing to win {web3.utils.fromWei(balance, 'ether')} ethers!
      </p>
      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want  to try your LUCK?</h4>
        <div>
          <label>Amount of ether to enter : </label>
          <input 
                value={ether}
                onChange={event => setEther(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner</h4>
      <button onClick={onClick}>Pick A winner</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;

