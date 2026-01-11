// import { useState, useEffect } from 'react';
// import { Box, Card, Typography, IconButton, Paper, Button, TextField } from '@mui/material';
// import { Plus, Trash2, Loader } from 'lucide-react';

// type ColumnId = 'todo' | 'in_progress' | 'done';

// interface KanbanCard {
//   id: string;
//   title: string;
//   column_id: ColumnId;
// }

// interface Column {
//   id: ColumnId;
//   title: string;
//   headerColor: string;
//   accentColor: string;
// }

// const COLUMNS: Column[] = [
//   { id: 'todo', title: 'Todo', headerColor: '#0091ff', accentColor: '#fbbf24' },
//   { id: 'in_progress', title: 'In Progress', headerColor: '#f59e0b', accentColor: '#fbbf24' },
//   { id: 'done', title: 'Done', headerColor: '#10b981', accentColor: '#10b981' },
// ];

// export default function KanbanBoard() {
//   const [cards, setCards] = useState<KanbanCard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCardId, setEditingCardId] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');

//   // Initial Data
//   useEffect(() => {
//     const initialData: KanbanCard[] = [
//       { id: '1', title: 'Create initial project plan', column_id: 'todo' },
//       { id: '2', title: 'Design landing page', column_id: 'todo' },
//       { id: '4', title: 'Implement authentication', column_id: 'in_progress' },
//       { id: '7', title: 'Organize project repository', column_id: 'done' },
//     ];
//     setCards(initialData);
//     setLoading(false);
//   }, []);

//   // --- Functions ---
//   const addCard = (columnId: ColumnId) => {
//     const newCard: KanbanCard = {
//       id: Math.random().toString(36).substr(2, 9),
//       title: 'New Task',
//       column_id: columnId,
//     };
//     setCards([...cards, newCard]);
//   };

//   const deleteCard = (id: string) => {
//     setCards(cards.filter(c => c.id !== id));
//   };

//   const updateTitle = (id: string) => {
//     if (!editValue.trim()) return setEditingCardId(null);
//     setCards(cards.map(c => c.id === id ? { ...c, title: editValue } : c));
//     setEditingCardId(null);
//   };

//   // --- DnD Handlers ---
//   const onDragStart = (e: React.DragEvent, cardId: string) => {
//     e.dataTransfer.setData('cardId', cardId);
//   };

//   const onDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const onDrop = (e: React.DragEvent, targetColumnId: ColumnId) => {
//     const cardId = e.dataTransfer.getData('cardId');
//     setCards(prev => prev.map(c => c.id === cardId ? { ...c, column_id: targetColumnId } : c));
//   };

//   if (loading) return <Box display="flex" justifyContent="center" p={5}><Loader className="animate-spin" /></Box>;

//   return (
//     <Box p={3} sx={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
//       <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', overflowX: 'auto', width: '1200px', pb: 2 }}>
//         {COLUMNS.map(column => {
//           const columnCards = cards.filter(c => c.column_id === column.id);

//           return (
//             <Paper 
//               key={column.id}
//               onDragOver={onDragOver}
//               onDrop={(e) => onDrop(e, column.id)}
//               elevation={0}
//               sx={{ flex: '1 1 350px', minWidth: '300px', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', minHeight: '500px' }}
//             >
//               {/* Header */}
//               <Box sx={{ backgroundColor: column.headerColor, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   <Typography variant="subtitle1" fontWeight="bold">{column.title}</Typography>
//                   <Box sx={{ backgroundColor: 'rgba(255,255,255,0.2)', px: 1, borderRadius: '4px', fontSize: '0.85rem' }}>
//                     {columnCards.length}
//                   </Box>
//                 </Box>
//                 <IconButton size="small" sx={{ color: 'white' }} onClick={() => addCard(column.id)}><Plus size={20} /></IconButton>
//               </Box>

//               {/* Column Content */}
//               <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <Button 
//                   startIcon={<Plus size={18}/>} 
//                   fullWidth 
//                   onClick={() => addCard(column.id)}
//                   sx={{ justifyContent: 'flex-start', textTransform: 'none', backgroundColor: 'white', color: '#64748b', boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' }}
//                 >
//                   Add Card
//                 </Button>

//                 {columnCards.map(card => (
//                   <Card 
//                     key={card.id}
//                     draggable
//                     onDragStart={(e) => onDragStart(e, card.id)}
//                     elevation={0}
//                     sx={{ 
//                       position: 'relative', 
//                       borderRadius: '4px', 
//                       borderLeft: `4px solid ${column.accentColor}`,
//                       boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
//                       cursor: 'grab',
//                       '&:active': { cursor: 'grabbing' }
//                     }}
//                   >
//                     <Box sx={{ p: 2, pr: 6 }}>
//                       {editingCardId === card.id ? (
//                         <TextField 
//                           fullWidth 
//                           variant="standard" 
//                           autoFocus
//                           value={editValue}
//                           onChange={(e) => setEditValue(e.target.value)}
//                           onBlur={() => updateTitle(card.id)}
//                           onKeyDown={(e) => e.key === 'Enter' && updateTitle(card.id)}
//                         />
//                       ) : (
//                         <Typography 
//                           variant="body2" 
//                           onClick={() => { setEditingCardId(card.id); setEditValue(card.title); }}
//                           sx={{ color: '#334155', fontWeight: 500, cursor: 'text' }}
//                         >
//                           {card.title}
//                         </Typography>
//                       )}
//                       <Box sx={{ mt: 1.5, width: 30, height: 10, backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
//                     </Box>
                    
//                     <IconButton 
//                       size="small" 
//                       onClick={() => deleteCard(card.id)}
//                       sx={{ position: 'absolute', top: 12, right: 8, color: '#ef4444' }}
//                     >
//                       <Trash2 size={18} />
//                     </IconButton>
//                   </Card>
//                 ))}
//               </Box>
//             </Paper>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }


import { Box } from '@mui/material';
import { Loader } from 'lucide-react';
import { COLUMNS } from '../data/columns';
import { useKanban } from '../hooks/useKanban';
import KanbanColumn from './KanbanColumn';
import { useState } from 'react';

export default function KanbanBoard() {
  const { cards, loading, addCard, deleteCard, moveCard } = useKanban();
  const [draggedId, setDraggedId] = useState<string | null>(null);

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><Loader className="animate-spin" /></Box>;

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', p: 4 }}>
      <Box display="flex" gap={3} maxWidth="1400px" margin="0 auto">
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={cards.filter(c => c.column_id === col.id)}
            onAdd={() => addCard(col.id)}
            onDelete={deleteCard}
            onDragStart={(id) => setDraggedId(id)}
            onDrop={(columnId) => draggedId && moveCard(draggedId, columnId)}
          />
        ))}
      </Box>
    </Box>
  );
}