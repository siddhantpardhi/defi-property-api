import { Link } from "react-router-dom";
import { Github, Twitter, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-white">CoreX</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Next-generation DeFi platform for decentralized finance and Web3.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">DeFi Products</h4>
            <ul className="space-y-2 text-sm text-slate-400 leading-relaxed">
              <li><Link to="/trading" className="hover:text-blue-400 transition-colors">DEX Trading</Link></li>
              <li><Link to="/markets" className="hover:text-blue-400 transition-colors">Yield Farming</Link></li>
              <li><Link to="/wallet" className="hover:text-blue-400 transition-colors">Staking Pools</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Liquidity Mining</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400 leading-relaxed">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Community</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 CoreX. All rights reserved. Decentralized. Trustless. Permissionless.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
