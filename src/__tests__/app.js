import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../app'
import { submitForm } from '../api';

jest.mock('../api', () => ({
    submitForm: jest.fn().mockResolvedValue({ data: 'response data' }),
}));

beforeEach(() => {
    submitForm.mockResolvedValue({ message: 'Form submitted succesfully' })
})

describe('Cas passant', () => {
    test('l\'utilisateur remplit le formulaire avec des valeurs valides et soumet avec succès', async () => {
        render(<App />);

        // Un titre "Welcome home" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/welcome home/i);

        // Un lien "Fill out the form" est dans le document
        const formLink = screen.getByRole('link', { name: /fill out the form/i });
        expect(formLink).toBeInTheDocument()

        // L'utilisateur clique sur le lien
        userEvent.click(formLink);
        
        // Un titre "Page 1" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i);

        // Un lien "Go home" est dans le document
        expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();

        // Un champ avec le label "Favorite food" est dans le document et l'utilisateur rempli le champ avec "Les pâtes"
        userEvent.type(screen.getByRole('textbox'), 'Les pâtes');

        // Un lien "Next" est dans le document
        const nextLink = screen.getByRole('link', { name: /next/i });
        expect(nextLink).toBeInTheDocument()

        // L'utilisateur clique sur le lien "Next"
        userEvent.click(nextLink);
        
        // Un titre "Page 2" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i);

        // Un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();

        // Un champ avec le label "Favorite drink" est dans le document et l'utilisateur rempli le champ avec "Bière"
        userEvent.type(screen.getByRole('textbox'), 'Bière');

        // Un lien "Review" est dans document
        const reviewLink = screen.getByRole('link', { name: /review/i });
        expect(reviewLink).toBeInTheDocument();

        // L'utilisateur clique sur le lien "Review"
        userEvent.click(reviewLink);
        
        // Un titre "Confirm" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i);

        // Un texte "Please confirm your choices" est dans le document
        expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument();

        // Un texte label "Favorite Food" a pour contenu "Les pâtes"
        // expect(screen.getByText('Favorite Food: Les pâtes')).toBeInTheDocument();

        // Un texte label "Favorite Drink" a pour contenu "Bière"
        // expect(screen.getByText('Favorite Drink: Bière')).toBeInTheDocument();

        // Un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i})).toBeInTheDocument();

        // Un bouton "Confirm" est dans le document et l'utilisateur clique sur le bouton "Confirm"
        userEvent.click(screen.getByRole('button', { name: /confirm/i }));
                      
        await waitFor(() => {
            // Un titre "Congrats. You did it." est dans le document
            expect(screen.getByText('Congrats. You did it.')).toBeInTheDocument();
        });

        // Un lien "Go home" est dans le document
        const homeLink = screen.getByRole('link', { name: /go home/i });
        expect(homeLink).toBeInTheDocument();

        // L'utilisateur clique sur le lien "Go Home"
        userEvent.click(homeLink);

        // Un titre "Welcome home" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/welcome home/i);
    });
});

describe('Cas non passant', () => {
    test('l\'utilisateur remplit le formulaire avec des valeurs invalides et soumet une erreur', async () => {
        render(<App />);

        // Un titre "Welcome home" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/welcome home/i);

        // Un lien "Fill out the form" est dans le document
        const formLink = screen.getByRole('link', { name: /fill out the form/i });
        expect(formLink).toBeInTheDocument()

        // L'utilisateur clique sur le lien
        userEvent.click(formLink);
        
        // Un titre "Page 1" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i);

        // Un lien "Go home" est dans le document
        expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();

        // Un champ avec le label "Favorite food" est dans le document et l'utilisateur rempli le champ avec ""
        userEvent.type(screen.getByRole('textbox'), null);

        // Un lien "Next" est dans le document
        const nextLink = screen.getByRole('link', { name: /next/i });
        expect(nextLink).toBeInTheDocument()

        // L'utilisateur clique sur le lien "Next"
        userEvent.click(nextLink);
        
        // Un titre "Page 2" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i);

        // Un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();

        // Un champ avec le label "Favorite drink" est dans le document et l'utilisateur rempli le champ avec "Bière"
        userEvent.type(screen.getByRole('textbox'), 'Bière');

        // Un lien "Review" est dans document
        const reviewLink = screen.getByRole('link', { name: /review/i });
        expect(reviewLink).toBeInTheDocument();

        // L'utilisateur clique sur le lien "Review"
        userEvent.click(reviewLink);
        
        // Un titre "Confirm" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i);

        // Un texte "Please confirm your choices" est dans le document
        expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument();

        // Un texte label "Favorite Food" a pour contenu ""
        // expect(screen.getByText('Favorite Food: ')).toBeInTheDocument();

        // Un texte label "Favorite Drink" a pour contenu "Bière"
        // expect(screen.getByText('Favorite Drink: Bière')).toBeInTheDocument();

        // Un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i})).toBeInTheDocument();

        // Un bouton "Confirm" est dans le document et l'utilisateur clique sur le bouton "Confirm"
        userEvent.click(screen.getByRole('button', { name: /confirm/i }));
                      
        await waitFor(() => {
            // Un titre "Oh no. There was an error." est dans le document
            expect(screen.getByText('Oh no. There was an error.')).toBeInTheDocument();
        });

        // Un texte "les champs food et drink sont obligatoires" est dans le document
        expect(screen.getByText(/les champs food et drink sont obligatoires/i)).toBeInTheDocument();

        // Un lien "Go home" est dans le document
        expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();

        // Un lien "Try again" est dans le document
        const tryAgainLink = screen.getByRole('link', { name: /try again/i });
        expect(tryAgainLink).toBeInTheDocument();

        // L'utilisateur clique sur le lien "Try again"
        userEvent.click(tryAgainLink);

        // Un titre "Page 1" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i);
    });
});
