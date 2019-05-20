import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import Token from "@google/maps"
// reactstrap components
import {
    Input,
  } from "reactstrap";

const API_KEY = "AIzaSyB5VeKvb2VighMJK1jyLYGNIWKU_QWMkkc"
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
    sessionToken: Token.util.placesAutoCompleteSessionToken(),
    formattedAddress: "",
  }

  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }

  handleSelectSuggest(suggest) {
    this.props.action(suggest)
    this.setState({search: "", value: suggest.formatted_address, formattedAddress: suggest.formatted_address})
  }

  render() {
    const {search, value} = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{input: search, placesAutoCompleteSessionToken: this.state.sessionToken }}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
              >
                <Input
                  type="text"
                  value={value}
                  placeholder="Search a location"
                  onChange={this.handleInputChange.bind(this)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    )
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object,
}

export default GoogleSuggest