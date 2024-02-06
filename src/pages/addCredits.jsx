import React, { useState }  from 'react';
import AddCredits from '../components/UI/addCreditsitm';
import ConfirmCredits from'../components/UI/confirmCredits';

const CreditManagement = () => {
    const [showAddCredits, setShowAddCredits] = useState(true);

    const handleFormSuccess = () => {
      // Appelé lorsque la soumission du formulaire AddCredits réussit
      // Changer l'état pour afficher ConfirmCredits et masquer AddCredits
      setShowAddCredits(false);
    };

  return (
    <div>
    {showAddCredits && <AddCredits onFormSuccess={handleFormSuccess} />}
    {!showAddCredits && <ConfirmCredits />}
  </div>
  );
};

export default CreditManagement;
