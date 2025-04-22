import Grid from '@mui/material/GridLegacy';
import  Container  from '@mui/material/Container';

import ProductCard from '../Components/ProductCard';
import { useEffect, useState } from 'react';
import Product from "../types/Product";
import { BASE_URl } from '../constant/baseUrl';
import { Box } from '@mui/material';



const HomePage = () => { 
  const[error,setError]= useState (false);
  
  
  const [products,setproducts] = useState<Product[]>([]);
  useEffect(()=>{  
    const fetchData = async()=>{ 
      try{
        const response= await fetch(`${BASE_URl}/product`);
      const data=await response.json();
        setproducts(data); 
      }
      catch{
        setError(true);
      }
      
    }
    fetchData();
  },[]);
  if(error)
  {
    return <Box>Something went worng, please try again!</Box>
  }






  return (
    <Container sx={{mt:10}}>
      <Grid container spacing={2}>
        {products.map((p)=>( <Grid item md={4} >
          <ProductCard  {...p}/> 
           </Grid>))}
        
        
      </Grid>
    </Container>
  );
};

export default HomePage;