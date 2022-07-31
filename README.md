# MacPaw Internship

This project was made by **Maksim Svishcho** maksimdssv@gmail.com.

The project is fully completed.

# Hosted Version

Hosted version is avaliable at https://floating-ravine-63769.herokuapp.com/

# Main Components

Main components are placed in src/components directory. Brief description of all the components:

## index.js

Contains main js code, which renders React code. Nothing changed from default

## App.js

Contains all backend code to interact with API. All requests from React come through this Node server. ***Requires express, axios, form-data, express-fileupload.*** 

## App.jsx

Main component. Contains **UploadImage, Menu, Header, Start and Section** components. Also in charge of handling history of browsing, and current rendered section.

## Menu.jsx

Contains left side of page. Consists of 3 **MenuButton** elements.

### MenuButton.jsx

Displays the corresponding image and button, that changes the current displayed section.

## Start.jsx

Displays starting image of a girl with pet.

## Sections.jsx

Renders one of the elements depending on current value of *sectionName* variable.
Contains **BreedInfo, Voting, Breeds, Gallery** and **CatsTable** elements. All these elements also include **Title** element, which simply contains "Go Back" button and name of the section.

## Voting.jsx

Renders image of cat and voting buttons. Also renders last user logs since the lauch of server. When clicked on like or dislike, the cat gets replaced with new one. Clicking favourite button will add the image to favourites, or remove it from them, if the image was favourite when clicked. Contains 3 **VotingButton** and 4 **UserLog** elements.

### VotingButton.jsx

Returns a button that displays corresponding image and does corresponding action(e.g. adds to likes).

### UserLog.jsx

Displays a log of last action.

## Breeds.jsx

Displays selects which filter the breeds array. Included **CatDisplay** handles the images of cats. Clicking on any cat will open the **BreedInfo** element, which contains the info page about selected breed.

## BreedInfo.jsx

Return a page with info about selected breed. Contains 5 images of breed. Clicking on dots below image will change it.

## Gallery.jsx

Almost the same as breeds, but more selects and images allow to add them to favourites. Refresh button applies the filters and loads new images.

## CatDisplay.jsx

Responsible for properly placing images of cats. Contains **CatButton**.

### CatButton.jsx

Displays image and a button, which depending on prop either adds image to favourite, displays info about breed, or shows nothing.

## CatsTable.jsx 

Show likes, dislikes, favourites, or result of searching, depending on which button you clicked in header.

## UploadImage.jsx

Displays when upload button is clicked. Allows to upload images to CatAPI.
