import React, { Component } from "react";


import {
  Input
} from "reactstrap";




class EditAddress extends Component {

//   fetchAddress = async input => {
//     let error = null;
//     let predictions = null;

//     try {
//       // URL //
//       let url =
//         "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
//         input +
//         "&types=address" +
//         "&components=country:us" +
//         "&sessiontoken=" +
//         this.state.sessionToken +
//         "&key=" +
//         googleApiKey;
//       // URL //

//       let addressResponse = await fetch(url);
//       addressResponse = await addressResponse.json();
//       predictions = addressResponse.predictions;
//     } catch (e) {
//       console.log("error with google api...");
//       console.log(e);
//       error = e;
//     }

//     this.normalizeAddresses(predictions, error);
//   };

//   normalizeAddresses = (addresses, err) => {
//     let _addresses = null;

//     if (err) {
//       _addresses = [
//         {
//           description: "Error: Can't connect to address prediction",
//           place_id: null
//         }
//       ];
//     } else {
//       _addresses = addresses.map(value => {
//         let { description, place_id } = value;
//         description = description.replace(", USA", "");
//         const address = {
//           description,
//           place_id
//         };
//         return address;
//       });

//       this.setState({ addresses: _addresses });
//     }
//   };

//   /**
//    * item = {
//    *      description: "street, city, state"
//    *      place_id: <place_id>
//    * }
//    */
//   postAddress = async item => {
//     const { place_id } = item;
//     // URL //
//     let url =
//       "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
//       place_id +
//       "&sessiontoken=" +
//       this.state.sessionToken +
//       "&key=" +
//       googleApiKey;
//     // URL //

//     // RESPONSE //
//     let response = await fetch(url);
//     response = await response.json();
//     // RESPONSE //

//     // CAPTURE formatted_address for zipCode fom response
//     let { formatted_address } = response.result;
//     formatted_address = formatted_address.split(", ");

//     const zipCode = formatted_address[2].split(" ")[1];

//     // Tokenize item.description
//     let { description } = item;

//     /**
//      * description[0] = street
//      * description[1] = city
//      * description[2] = state
//      */
//     description = description.split(", ");

//     let formattedAddress = {
//       address: description[0],
//       city: description[1],
//       state: description[2],
//       zipCode,
//       country: "US"
//     };

//     // this.setState({ isLoading: true });
//     // this.props.updateAddress(formattedAddress, () => {
//     //   this.setState({ isLoading: false });
//     //   if (this.props.checkingOut) {
//     //     this.props.navigation.goBack();
//     //   } else {
//     //     this.props.navigation.goBack();
//     //   }
//     // });
//   };

 }





export default EditAddress;

