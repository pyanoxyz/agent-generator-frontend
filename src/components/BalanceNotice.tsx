const BalanceNotice = () => {
  return (
    <div className="bg-primary rounded-lg p-3 text-gray-300">
      <div className="flex items-start gap-2.5">
        <div>
          <div className="mb-1">
            <span className="text-sm ">
              A minimum balance of <span className="font-mono font-medium">.001 SOL</span> on Solana
              network is required for deploying a character.
            </span>
          </div>
          <p className="text-xs ">
            This is a balance check only – no funds will be deducted. This measure helps prevent
            scammers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceNotice;
