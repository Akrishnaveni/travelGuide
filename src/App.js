import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {
    placesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPlaces()
  }

  getPlaces = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data.packages)
    const updatedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))

    this.setState({placesList: updatedData, isLoading: false})
  }

  render() {
    const {placesList, isLoading} = this.state

    return (
      <div className="app-container">
        <div>
          <h1 className="heading">Travel Guide</h1>
        </div>
        {isLoading ? (
          <>
            <div data-testid="loader" className="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          </>
        ) : (
          <ul className="places-container">
            {placesList.map(eachPackage => (
              <li className="list-item" key={eachPackage.id}>
                <img
                  src={eachPackage.imageUrl}
                  alt={eachPackage.name}
                  className="image"
                />
                <div className="text">
                  <h1 className="name">{eachPackage.name}</h1>
                  <p className="description">{eachPackage.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default App
