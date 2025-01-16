const BalanceNotice = () => {
  return (
    <div className="bg-[#59B96A] rounded-lg p-3 text-white">
      <div className="flex items-start gap-2.5">
        <div>
          <div className="mb-1">
            <span className="text-sm ">
              A minimum balance of <span className="font-mono font-medium">0.01 ETH</span> on ETH or
              Base network is required for deploying a character.
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
