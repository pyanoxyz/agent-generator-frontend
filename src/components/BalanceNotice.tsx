import { TbShieldLock } from "react-icons/tb";

const BalanceNotice = () => {
  return (
    <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5">
          <TbShieldLock className="w-4 h-4 text-zinc-400" />
        </div>
        <div>
          <div className="mb-1">
            <span className="text-sm text-zinc-300">
              A minimum balance of{' '}
              <span className="text-blue-400 font-mono font-medium">0.01 ETH</span>
              {' '}on ETH or Base network is required for deploying a character.
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            This is a balance check only – no funds will be deducted. This measure helps prevent scammers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceNotice;