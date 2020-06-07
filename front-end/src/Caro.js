import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import indian from './UI/indian.jpeg'
import chinese from './UI/chinese.jpg'
import italian from './UI/italian.jpg'
 
class Caro   extends React.Component {
  items = [<div>
              <div>
                <img src={indian} style={{width:'90%', height:'105%'}}/>
              </div>
              <p>Indian</p>
            </div>,
            <div>
            <div>
              <img src={chinese} style={{width:'90%', height:'105%'}}/>
            </div>
            <p>Chinese</p>
            </div>,
            <div>
            <div>
              <img src={italian} style={{width:'90%', height:'105%'}}/>
            </div>
            <p>Italian</p>
            </div>,
            <div>
            <div>
              <img src={italian} style={{width:'90%', height:'105%'}}/>
            </div>
            <p>Mexican</p>
            </div>
     ]
 
  state = {
    currentIndex: 0,
    responsive: { 1024: { items: 3 } },
    galleryItems: this.galleryItems(),
  }
 
  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })
 
  thumbItem = (item, i) => <span onClick={() => this.slideTo(i)}>* </span>
 
  galleryItems() {
    return this.items.map((i) => <h2 key={i}> {i}</h2>)
  }
 
  render() {
    const { galleryItems, responsive, currentIndex } = this.state
    return (
      <div style={{margin:'50px'}}>
      <div ><h4>Categories</h4></div>
      <div style={{marginLeft:'20%', marginRight:'20%', marginTop:'3%'}}>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          autoPlay={true}
          autoPlayInterval={2000}
          items={galleryItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          onSlideChanged={this.onSlideChanged}
        />
        </div>
        </div>
    )
  }
}

export default Caro;
