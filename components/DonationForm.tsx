
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LoaderIcon, CreditCardIcon, SparklesIcon } from './ui/Icons';
import DonationSuccessModal from './DonationSuccessModal';
import type { DonationType } from '../App';

interface DonationFormProps {
    projectTitle?: string;
    onDonationSuccess?: () => void;
    initialDonationType?: DonationType;
}

const DonationForm: React.FC<DonationFormProps> = ({ projectTitle, onDonationSuccess, initialDonationType }) => {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<DonationType>(initialDonationType || 'monthly');
  const [status, setStatus] = useState<'idle' | 'processing' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { t } = useLanguage();


  const presetAmounts = [25, 50, 100, 250];

  const impactMap: Record<number, string> = {
    25: 'donation_impact_25',
    50: 'donation_impact_50',
    100: 'donation_impact_100',
    250: 'donation_impact_250',
  };

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(Number(value))) {
      setAmount(Number(value));
    } else if (!value) {
      setAmount(0);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('processing');

    try {
      // Step 1: Call our backend (e.g., a Vercel function) to create a payment intent.
      // The backend would create a Stripe PaymentIntent and a 'pending' record in Supabase.
      // Example: fetch('/api/create-payment-intent', { method: 'POST', body: JSON.stringify({ amount, projectId }) });
      console.log(`Simulating backend call for ${donationType} donation...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockClientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`;
      console.log('Received mock client secret:', mockClientSecret);

      // Step 2: The frontend uses the clientSecret to confirm the payment with Stripe.js.
      // This step securely handles card details on the client-side without them ever touching our server.
      // In a real app, you would use stripe.confirmCardPayment(mockClientSecret, { payment_method: { card: cardElement } });
      console.log('Simulating Stripe.js payment confirmation...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      // if (result.error) { throw new Error(result.error.message); }

      // Step 3: Payment succeeded. Stripe sends a webhook to our backend.
      // The webhook handler updates the Supabase record from 'pending' to 'succeeded'
      // and could trigger a SendGrid email to the user.
      console.log('Payment successful. A webhook would handle DB updates and confirmation emails.');

      // Step 4: Show success to the user on the frontend and trigger callback.
      setShowSuccessModal(true);
      if (onDonationSuccess) {
        onDonationSuccess();
      }

    } catch (error) {
      console.error("Simulated Payment Error:", error);
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Optionally reset form
    setAmount(50);
    setCustomAmount('');
  }

  const currentImpactKey = !customAmount && impactMap[amount];

  return (
    <>
    <DonationSuccessModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        amount={amount}
        projectTitle={projectTitle || t('general_donation_title')}
    />
    <div className="bg-red-50 p-6 rounded-lg border-2 border-red-100">
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{projectTitle ? t('donation_form_title') : t('general_donation_title')}</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" onClick={() => setDonationType('one-time')} className={`py-2 px-6 text-sm font-medium transition-colors duration-200 ${donationType === 'one-time' ? 'bg-red-600 text-white z-10 ring-2 ring-red-600' : 'bg-white text-gray-700 hover:bg-red-50'} rounded-l-lg border border-gray-300`}>
                    {t('donation_one_time')}
                </button>
                <button type="button" onClick={() => setDonationType('monthly')} className={`py-2 px-6 text-sm font-medium transition-colors duration-200 ${donationType === 'monthly' ? 'bg-red-600 text-white z-10 ring-2 ring-red-600' : 'bg-white text-gray-700 hover:bg-red-50'} rounded-r-md border border-gray-300 -ml-px`}>
                    {t('donation_monthly')}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {presetAmounts.map(preset => (
            <button
              key={preset}
              type="button"
              onClick={() => handleAmountClick(preset)}
              disabled={status === 'processing'}
              className={`py-3 px-4 rounded-md font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                amount === preset && !customAmount
                  ? 'bg-red-600 text-white ring-2 ring-offset-2 ring-red-600 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-red-100 border border-gray-300'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        {currentImpactKey && (
            <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-red-200 shadow-sm animate-fade-in transition-all">
                <div className="flex items-start space-x-3">
                    <SparklesIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <span className="block text-xs font-bold text-red-800 uppercase tracking-wider mb-1">Your Impact</span>
                        <p className="text-gray-800 font-medium text-sm md:text-base leading-snug">
                            {t(currentImpactKey)}
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="mb-6">
          <label htmlFor="custom-amount" className="sr-only">{t('custom_amount_label')}</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-lg">$</span>
            </div>
            <input
              type="number"
              id="custom-amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              disabled={status === 'processing'}
              placeholder={t('custom_amount_placeholder')}
              className="w-full text-lg p-3 pl-8 rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment_details_label')}</label>
            <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                <div className="flex items-center space-x-2 text-gray-500">
                    <CreditCardIcon className="w-5 h-5"/>
                    <p className="text-sm">{t('secure_stripe_element')}</p>
                </div>
                {/* In a real implementation, the Stripe Card Element would be mounted here,
                    replacing this placeholder div. */}
            </div>
        </div>

        <button
          type="submit"
          disabled={status === 'processing'}
          className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-md text-xl hover:bg-red-700 transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:bg-red-400 disabled:scale-100 disabled:cursor-wait flex items-center justify-center space-x-2 shadow-lg"
        >
          {status === 'processing' && <LoaderIcon className="w-6 h-6 animate-spin" />}
          <span>{status === 'processing' ? t('processing') : t('donate_now_button')}</span>
        </button>
      </form>
      
      {status === 'error' && (
        <p className="mt-4 text-center text-red-700 bg-red-100 p-3 rounded-md">
          {t('donation_error')}
        </p>
      )}
    </div>
    </>
  );
};

export default DonationForm;
