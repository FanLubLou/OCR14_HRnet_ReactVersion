// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configuration globale pour react-modal
import Modal from 'react-modal';
Modal.setAppElement(document.createElement('div'));

// Configuration pour supprimer les avertissements de act()
configure({ asyncUtilTimeout: 10000 });