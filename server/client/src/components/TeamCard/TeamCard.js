import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';

export default function TeamCard({id, name, src}) {

    const navigate = useNavigate();

  return (
    <Card elevation={8} sx={{ maxWidth: 345, "&:hover":{cursor: "pointer"} }} onClick={() => navigate(`/teams/${id}`)}>
      <CardMedia
        sx={{ height: 200, backgroundPositionY: '0', backgroundSize:'contain' }}
        image = {`/assets/badges/${src}`} 
        title= {name}
      />
    </Card>
  );
}
