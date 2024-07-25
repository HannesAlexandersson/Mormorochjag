import imageUrlBuilder from '@sanity/image-url'
import { client } from "@/sanity/client";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

interface ImageSource {
  _type: string;
  asset: {
    _ref: string;
  };
}
// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export default function urlFor(source: ImageSource) {
  return builder.image(source)
}

// Now you can use this handy builder-syntax to create your urls:

// <img src={urlFor(person.image).width(200).url()} />