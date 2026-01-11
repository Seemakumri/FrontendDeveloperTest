import { Card, Typography, IconButton, Box, TextField } from '@mui/material';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { KanbanCard as CardType } from '../types/kanban';


interface Props {
  card: CardType;
  accentColor: string;
  onDelete: () => void;
  onDragStart: (id: string) => void;
}

export default function KanbanCard({ card, accentColor, onDelete, onDragStart }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(card.title);

  return (
    <Card
      draggable
      onDragStart={() => onDragStart(card.id)}
      sx={{
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: 1,
        position: 'relative',
        cursor: 'grab'
      }}
    >
      <Box p={2} pr={6}>
        {editing ? (
          <TextField
            variant="standard"
            fullWidth
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={() => setEditing(false)} 
          />
        ) : (
          <Typography onClick={() => setEditing(true)} fontWeight={500}>
            {value}
          </Typography>
        )}
      </Box>

      <IconButton
        onClick={onDelete}
        sx={{ position: 'absolute', top: 8, right: 8, color: '#ef4444' }}
      >
        <Trash2 size={18} />
      </IconButton>
    </Card>
  );
}
