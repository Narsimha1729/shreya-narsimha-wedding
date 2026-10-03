const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const WEDDING_CONFIG = {
  /** Flip this on and set `date` when the muhurtham is confirmed. */
  dateConfirmed: false,
  date: new Date('2026-12-14T10:30:00+05:30'),
  song: {
    title: 'Sukh Kalale',
    src: asset('/assets/audio/sukh-kalale.mp3'),
  },
  cover: asset('/assets/images/gallery/01.jpeg'),
  bride: {
    name: 'Shreya',
    fullName: 'Shreya',
    photo: asset('/assets/images/gallery/01.jpeg'),
    objectPosition: '72% 38%',
  },
  groom: {
    name: 'Narsimha',
    fullName: 'Narsimha',
    photo: asset('/assets/images/gallery/01.jpeg'),
    objectPosition: '22% 34%',
  },
  venue: {
    ceremony: {
      name: 'Marigold Regency',
      address: 'Shiv Road, Shirdi, Taluka Rahata, Ahmednagar 423109',
      time: 'Morning ceremony',
      photo: asset('/assets/images/gallery/02.jpeg'),
      mapQuery: 'https://maps.app.goo.gl/YJ7bJCAx2uCp3Bgu7',
    },
    reception: {
      name: 'Marigold Regency',
      address: 'Shiv Road, Shirdi, Taluka Rahata, Ahmednagar 423109',
      time: 'Evening celebration',
      photo: asset('/assets/images/gallery/03.jpeg'),
      mapQuery: 'https://maps.app.goo.gl/YJ7bJCAx2uCp3Bgu7',
    },
  },
  gallery: [
    {
      src: asset('/assets/images/gallery/01.jpeg'),
      caption: 'The smile that started forever',
    },
    {
      src: asset('/assets/images/gallery/02.jpeg'),
      caption: 'Walking into the day together',
    },
    {
      src: asset('/assets/images/gallery/03.jpeg'),
      caption: 'Hands that found their home',
    },
    {
      src: asset('/assets/images/gallery/04.jpeg'),
      caption: 'A look that says everything',
    },
    {
      src: asset('/assets/images/gallery/05.jpeg'),
      caption: 'Joy, side by side',
    },
    {
      src: asset('/assets/images/gallery/06.jpeg'),
      caption: 'Quiet laughter between us',
    },
    {
      src: asset('/assets/images/gallery/07.jpeg'),
      caption: 'Wrapped in the same moment',
    },
    {
      src: asset('/assets/images/gallery/08.jpeg'),
      caption: 'Gold, silk, and a shared smile',
    },
    {
      src: asset('/assets/images/gallery/09.jpeg'),
      caption: 'The kind of happy you keep',
    },
    {
      src: asset('/assets/images/gallery/10.jpeg'),
      caption: 'Steps we take together',
    },
    {
      src: asset('/assets/images/gallery/11.jpeg'),
      caption: 'A promise in the open air',
    },
    {
      src: asset('/assets/images/gallery/12.jpeg'),
      caption: 'Closer than the photograph',
    },
    {
      src: asset('/assets/images/gallery/13.jpeg'),
      caption: 'Two hearts, one frame',
    },
    {
      src: asset('/assets/images/gallery/14.jpeg'),
      caption: 'Still choosing each other',
    },
  ],
};
