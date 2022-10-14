import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FetchApi() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  let url = new URL('https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts/')
  let payload = {
    count: 6,
    productOnly: "true",
    target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9"
  };
  for (let i in payload) {
    url.searchParams.append(i, payload[i])
  }
  useEffect(() => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NzQ3NzIyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDkxMmNhZmM5ZTc5NmE0YjI2NmRmMiJ9.jZFtDEcsVkMC0BurU_FBbF0-gMfR7xYbTXkXVepAdod8PnTYNFpJ_RDViMMAR6xR85BBYFAEM0xcDvfMuW0h2NUJHmXIrQKXkiEdfBRsCEb_es4GSaz9eK-M7i83rKoSVBuIexmEzSDJ3ap7ess49smOdteZGzK46M8qe5GzlYyeaERg9CJGd-tnYuvlhpXdQsynNUfHxZHZljaLHLQRNJ1LPrHdy9PU5PT7-3dtfjvVGHmIjLujCpJEMxOPv_SH1S2PJdEBc1-RnjWSLyiMyw7pD3UAa0l6SsUwVSUePFe9GE7SnwYBN61ppxWkEm1oNtGlfEODCgSjVFJ4GRT66A",
        "Ced-Source-Id": "500",
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": "530",
        "Ced-Target-Name": "amazon",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.rows)
        setData(result.data.rows)
      })
  }, [])

  const ViewProduct = (ID) => {
    sessionStorage.setItem('container_id',ID)
    navigate('/viewDetails')
  }
  return (
    <div style={{ justifyContent: 'center', marginLeft: '6rem' }}>
      {data.map((item, index) => (
        <Card sx={{ maxWidth: 255, m: 1, float: 'left' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={item.main_image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.product_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has text ever since the 1500s.
            </Typography>
          </CardContent>
          <CardActions>
            <div style={{ justifyContent: 'center', display: 'grid', placeItems: 'center', margin: '1px auto' }}><Button  variant="contained"
            sx={{height:'2rem',width:'10rem',backgroundColor: '#dea493',
            color: 'white', '&:hover': { backgroundColor: '#ffa184' }}}
            onClick={()=>ViewProduct(item.container_id)} >View</Button></div>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default FetchApi