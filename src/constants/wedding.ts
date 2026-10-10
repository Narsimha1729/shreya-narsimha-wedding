const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const WEDDING_CONFIG = {
  dateConfirmed: true,
  /** First celebration. Countdown runs to this morning. */
  date: new Date('2026-12-18T00:00:00+05:30'),
  weddingDate: new Date('2026-12-19T00:00:00+05:30'),
  song: {
    title: 'Sukh Kalale',
    src: asset('/assets/audio/sukh-kalale.mp3'),
  },
  /** Couple film. Leave empty until the YouTube link is ready. */
  film: '',
  art: {
    cover: asset('/assets/theme/cover-sky.jpg'),
    paper: asset('/assets/theme/paper.jpg'),
    ganpati: asset('/assets/theme/ganpati.png'),
    haldi: asset('/assets/theme/haldi.jpg'),
    sangeet: asset('/assets/theme/sangeet.jpg'),
    vidhi: asset('/assets/theme/vidhi.jpg'),
    mangal: asset('/assets/theme/mangal-ashtak.jpg'),
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
      time: '18 December evening · Haldi & Sangeet · 19 December early morning · Wedding',
      photo: asset('/assets/images/gallery/02.jpeg'),
      mapQuery: 'https://maps.app.goo.gl/YJ7bJCAx2uCp3Bgu7',
    },
    reception: {
      name: 'Hotel Sai Siddhi',
      address:
        'Shirdi–Nagar Road, opposite Sai Ashram, Shirdi, Taluka Rahata, Ahmednagar 423109',
      time: 'Stay arranged for 18 and 19 December',
      photo: asset('/assets/images/gallery/03.jpeg'),
      mapQuery: 'https://maps.app.goo.gl/M3RH2ye9YMattHkB7',
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
