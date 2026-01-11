import { Box, Paper, Typography, IconButton, Button, Chip } from '@mui/material';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';
import type { Column, KanbanCard as CardType } from '../types/kanban';

interface Props {
  column: Column;
  cards: CardType[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onDrop: (columnId: any) => void;
  onDragStart: (id: string) => void;
}

export default function KanbanColumn({ column, cards, onAdd, onDelete, onDrop, onDragStart }: Props) {
  return (
 <Paper
  elevation={0}
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => onDrop(column.id)}
  sx={{ 
    flex: 1, 
    backgroundColor: '#f1f5f9', // Light Gray background
    borderRadius: '12px', 
    overflow: 'hidden',
    minHeight: '80vh', 
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #8457FF', // Thoda dark gray border
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', 
  }}
>
      {/* Header */}
      <Box sx={{ backgroundColor: column.headerColor, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontWeight={700} variant="subtitle1">{column.title}</Typography>
          <Chip label={cards.length} size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 'bold', height: 20 }} />
        </Box>
        <IconButton size="small" onClick={onAdd} sx={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <Plus size={18} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
          sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#64748b', borderColor: '#e2e8f0', backgroundColor: '#fff' }}
        >
          Add Card
        </Button>

        {cards.map(card => (
          <KanbanCard
            key={card.id}
            card={card}
            accentColor={column.accentColor}
            onDelete={() => onDelete(card.id)}
            onDragStart={onDragStart}
          />
        ))}
      </Box>
    </Paper>
  );
}