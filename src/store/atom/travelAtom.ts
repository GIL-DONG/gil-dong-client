import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ItineraryTypes, TheTopTypes } from '@/types/travel';

const { persistAtom } = recoilPersist({
  key: 'itinerary',
  storage: sessionStorage,
});

const theTopState = atom<TheTopTypes>({
  key: 'theTop',
  default: {
    title: '',
    destinations: [],
  },
  effects_UNSTABLE: [persistAtom],
});

const tabState = atom<string>({
  key: 'tabState',
  default: '',
});

const imageState = atom<string>({
  key: 'image',
  default: '',
});

const uploadImageState = atom<string>({
  key: 'uploadImage',
  default: '',
});

const itineraryState = atom<ItineraryTypes>({
  key: 'itinerary',
  default: {
    date_type: '',
    destinations: [],
    itinerary_id: '',
    session_id: '',
    title: '',
    timestamp: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export { theTopState, tabState, imageState, uploadImageState, itineraryState };
