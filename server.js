const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

// 🔧 Servir fitxers estàtics amb ruta base
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/XML', express.static(path.join(__dirname, 'XML')));

// 🔹 Ruta principal (ex: localhost:3000)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'XML', 'videotADJà.html'));
});

// 🔹 Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
    console.log("Rebuda petició a /create-checkout-session");
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: { name: 'Película de ejemplo' },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });

        console.log("Sessió creada correctament:", session.id);
        res.json({ url: session.url });
    } catch (err) {
        console.error('❌ Error al crear la sesión de Stripe:', err.message);
        res.status(500).json({ error: 'Error al crear la sesión de pago' });
    }
});


