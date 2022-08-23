import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import {data} from './data'
const Home = () => {
  // console.log(data)
  return (
    <>
     <Header/><br/><br/><br/><br/>
      <div className='collections'>
      {
        data.map((list,index)=>{
          return (
            <Card className='card' sx={{ maxWidth: 300,marginBottom:'20px',cursor:'pointer'}} key={index}>
              <CardMedia
                component="img"
                height= "250"
                width="300"
                image={list.image}
                alt="green iguana"
              />
              <Typography variant="h6" align='center'>
                  {list.Name}
              </Typography>
            </Card>
          );
        })
      }
      </div>
     <Footer/>
    </>
  )
}

export default Home
