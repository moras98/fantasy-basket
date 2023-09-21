import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadTeams } from '../../store/team/Team.actions';
import { useEffect, useState } from 'react';
import { calcularEdad } from '../../apis/player';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {field:'fullName', headerName: 'Nombre', sortable: false, flex: 1},
  {field: 'team', headerName: 'Equipo', flex: 1 , align: 'right', headerAlign: 'right'},
  {field: 'position', headerName: 'Posición', flex: 1, align: 'right', headerAlign: 'right'},
  {field: 'height', headerName: 'Altura (cm)', flex: 1, align: 'right', headerAlign: 'right'},
  {field: 'age', headerName: 'Edad', flex: 1, align: 'right', headerAlign: 'right'},
  {field: 'value', headerName: 'Valor', flex: 1, align: 'right', headerAlign: 'right'}
]


export default function PlayersList({ players }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teams = useSelector(state => state.teams);


  useEffect(()=>{
      async function load() {
          await dispatch( loadTeams());
      }
      load();
  }, [dispatch]);

  const data = players
    ? Object.keys(players).map(key => {
        const player = players[key];
        return {
          id: player.id,
          fullName: `${player.first_name} ${player.last_name}`,
          team: teams[player.team_id]?.name,
          position: player.position,
          height: player.height,
          age: calcularEdad(player.age),
          value: player.value,
        };
      })
    : [];

  return (
    <Paper>
      <Box>
        <DataGrid
          rows={data}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          autoHeight
          sx={{maxWidth: "100%"}}
          onRowClick={(row)=> navigate(`${row.id}`)}
        />
      </Box>
    </Paper>
  );
}