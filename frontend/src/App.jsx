import { useState } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import ExportButton from './components/ExportButton';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNoteAdded = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">MyNotes</h1>
        <ExportButton hasNotes={notes.length > 0} />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 lg:col-span-4 self-start">
          <NoteForm onNoteAdded={handleNoteAdded} />
        </div>
        <div className="md:col-span-8 lg:col-span-8">
          <NotesList
            notes={notes}
            setNotes={setNotes}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
