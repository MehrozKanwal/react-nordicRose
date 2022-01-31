import React from 'react';
//Stylesheet
import './About.css'

export default function About() {
  return <div className='about'>
  <div className='about-header'>
  <h1>ABOUT</h1>
  </div>
  <div className='content-about'>
  <h1>How this file can be used?</h1>
  <p>Feel free to use this file in any way you want,
   you can edit a copy of this file as much as you want for non-commercial or commercial purposes. 
   Its not necessary, but if you want, 
   you can ping me at @mikamatikainen on Twitter when using this file.
    Would be just nice to see how this evolves :- <br />
   Images: Copyright © Unsplash or Mika Matikainen.</p>

   <h1>A note about typefaces</h1>
   <p>This file is using platform-native typefaces for iOS & macOS, designed by Apple. To make texts editable, 
   you can download the typefaces at https://developer.apple.com/fonts/</p>

   <h1>Fonts used on the live site</h1>
   <div className='sub-content'>
   <p>Just for reference or if youre interested, I list here the typefaces Im using in on the live site at https://www.nordicrose.net. If youd like to use them in your own project,
    I added links for you as well to make it easier to purchase the required license.</p>
    <h2>GTF Chapter</h2>
    <p>-used in the logo as a vector outline by Good Type Foundry <br />
    -(https://www.goodtypefoundry.com/chapter)</p>
   
   <h1 className='macky'>Mackay Bold</h1>
   <p>large headlines by Rene Gieder (https://www.myfonts.com/fonts/rene-bieder/mackay/)</p>

   <h1>Harriet Text</h1>
   <p>-body copy by Okay Type <br />
   -(https://okaytype.com/typefaces/harriet)</p>


   <h2>Basis Groesque Pro</h2>
   <p>UI elements, some subtitles and some body copy by Colophon Foundry 
 -(https://www.colophon-foundry.org/typefaces/basis-grotesque/)
   </p>
   <h1 className='nokia'>NOKIA CELLPHONE FC</h1>
   <p>-some playful elements at some point, maybe by Zeh Fernando, available for free at Dafont<br />
   -(https://www.dafont.com/nokia-cellphone.font)
   </p>
   </div>
  </div>
      
  </div>;
}
