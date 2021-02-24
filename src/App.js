import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '800px' }}>
        <Chat userId={0}
          chatTitle="Username"
          conversationalistId={1}
          conversationalistAvatarUrl={'/avatar.png'}
        />
      </div>
    </div>
  );
}

export default App;
