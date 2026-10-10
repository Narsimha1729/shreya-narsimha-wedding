const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const WEDDING_CONFIG = {
  dateConfirmed: true,
  /** First celebration. Countdown runs to this morning. */
  date: new Date('2026-12-18T00:00:00+05:30'),
  weddingDate: new Date('2026-12-19T00:00:00+05:30'),
  song: {
    title: 'Love',
    youtubeId: 'kUUOlB_L2sA',
  },
  /** Couple film. */
  film: 'https://youtu.be/XdtlVIR7Csk',
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
      src: asset('/assets/images/gallery/couple-01.jpg'),
      caption: 'A step taken together',
    },
    {
      src: asset('/assets/images/gallery/couple-02.jpg'),
      caption: 'Under a rain of flowers',
    },
    {
      src: asset('/assets/images/gallery/couple-03.jpg'),
      caption: 'A look meant only for us',
    },
    {
      src: asset('/assets/images/gallery/couple-04.jpg'),
      caption: 'Seated, still smiling',
    },
    {
      src: asset('/assets/images/gallery/couple-05.jpg'),
      caption: 'A greeting, and a smile',
    },
    {
      src: asset('/assets/images/gallery/couple-06.jpg'),
      caption: 'A promise on one knee',
    },
  ],
};
