import { styled } from '@mui/material/styles';
import { Button, ButtonGroup, Fab, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './style.css'
import { connect } from 'react-redux';
import { mapStateToDispatch, mapStateToProps } from '../redux/StateManagement';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ViewProduct(props) {
  const [product, setProduct] = useState([])
  const [items, setItems] = useState({})
  const [index, setIndex] = useState(0)
  const [quantity, setQuantity] = useState(0)
  let url = new URL('https://multi-account.sellernext.com/home/public/connector/product/getProduct/')
  let payload = {
    target_marketplace: 'amazon',
    source_marketplace: 'shopify',
    sourceShopID: 500,
    targetShopID: 530,
    container_id: sessionStorage.getItem('container_id')
  }
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
        let temp = result.data.rows;
        temp.splice(6,13)
        console.log(temp)
        setProduct(temp)
        setItems(temp[0])
        temp.map((item, i) => {
          if (item.visibility === 'Catalog and Search')
            setItems(item)
        })
      })
  }, [])

  const ColorVarient = (indx) => {
    setItems(product[indx])
    setIndex(indx)
  }
  const decrease = (i) => {
    let temp = { ...items }
    temp.quantity -= 1
    let temp2 = [...product]
    temp2[i].quantity -= 1;
    setProduct(temp2)
    setItems(temp);
    console.log(temp)
  }
  const increase = (i) => {
    let temp = { ...items }
    temp.quantity += 1
    let temp2 = [...product]
    temp2[i].quantity += 1;
    setProduct(temp2)
    setItems(temp);
    console.log(temp)
  }
  const AddToCart = (i) => {
    props.addCart(product[i].quantity)
  }
  // setItems(product[0])
  console.log(items)
  // console.log(items.length)
  console.log(product)
  return (
    <div>
      <Navbar />
      <div style={{}}>
        <Grid container spacing={1} style={{ paddingLeft: '10rem', marginTop: '1rem' }}>
          <Grid item xs={5} sx={{ backgroundColor: '#dea493', p: 1 }}>
            <Item>
              <img src={items.main_image ? items.main_image : 'https://wholesaleduniya.com/wholeadmin/files/DesignImages/22115/63327_1.jpg'} alt='' style={{ width: '100%' }} />
              {console.log(items.main_image)}
            </Item>
          </Grid>
          <Grid item xs={4} sx={{ justifyContent: 'left', alignItems: 'start', textAlign: 'start' }}>
            <Item>
              <p>{items.brand}</p>
              <h3>{items.title}</h3>
              <h6>Color</h6>
              <div>
                {product.map((prod, i) => {
                  if (prod.visibility === 'Not Visible Individually') {
                    return (
                      <Fab variant="extended" size="small" color="success" aria-label="add" onClick={() => ColorVarient(i)}>
                        {prod.variant_title}
                      </Fab>
                    )
                  }
                })}
              </div>
              <h6>Quantity</h6>
              {product.map((prod, i) => {
                if (i === index) {
                  return (
                    <>
                      {items.quantity ?
                        <Grid >
                          <Grid>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                              <Button className='count_btn'
                                onClick={() => decrease(i)} sx={{
                                  backgroundColor: '#dea493',
                                  color: 'white', '&:hover': { backgroundColor: '#ffa184' }
                                }}>-</Button>
                              <span style={{ padding: 10 }}>{items.quantity}</span>
                              <Button className='count_btn' sx={{
                                backgroundColor: '#dea493',
                                color: 'white', '&:hover': { backgroundColor: '#ffa184' }
                              }}
                                onClick={() => increase(i)}>+</Button>
                            </ButtonGroup>
                          </Grid>
                          <Grid>
                            <Button className='cart_btn' variant='contained' sx={{
                              mt: 1, backgroundColor: '#dea493',
                              color: 'white', '&:hover': { backgroundColor: '#ffa184' }
                            }} onClick={() => AddToCart(i)}>Add to cart</Button>
                          </Grid>
                        </Grid>
                        :
                        null
                      }
                    </>
                  )
                }
              })}
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapStateToDispatch)(ViewProduct)