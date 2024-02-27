import { render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import PlayScreen from './PlayScreen';
import postAnswer from './DisplatCourse';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

