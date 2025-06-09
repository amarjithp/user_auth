'use client';

import { useEffect, useState } from 'react';

interface Language {
  name: string;
  value: string;
}

interface Model {
  name: string;
  value: string;
  languages: Language[];
}

interface Provider {
  name: string;
  value: string;
  models: Model[];
}

export default function AgentPage() {
  const [data, setData] = useState<Provider[]>([]);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [model, setModel] = useState<Model | null>(null);
  const [language, setLanguage] = useState<Language | null>(null);

  useEffect(() => {
    fetch('/stt.json')
      .then(res => res.json())
      .then(json => setData(json.providers));
      
  }, []);

  // Handle dropdown changes
  const handleProviderChange = (value: string) => {
    const selected = data.find(p => p.value === value) || null;
    setProvider(selected);
    setModel(null);
    setLanguage(null);
  };

  const handleModelChange = (value: string) => {
    if (!provider) return;
    const selected = provider.models.find(m => m.value === value) || null;
    setModel(selected);
    setLanguage(null);
  };

  const handleLanguageChange = (value: string) => {
    if (!model) return;
    const selected = model.languages.find(l => l.value === value) || null;
    setLanguage(selected);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 bg-black">
      <h1 className="text-2xl font-bold mb-4">Agent Config</h1>

      {/* Provider Dropdown */}
      <div>
        <label className="block font-medium mb-1">Provider</label>
        <select
          className="w-full p-2 border rounded bg-black"
          value={provider?.value || ''}
          onChange={e => handleProviderChange(e.target.value)}
        >
          <option value="">Select Provider</option>
          {data.map(p => (
            <option key={p.value} value={p.value}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Dropdown */}
      {provider && (
        <div>
          <label className="block font-medium mb-1">Model</label>
          <select
            className="w-full p-2 border rounded bg-black"
            value={model?.value || ''}
            onChange={e => handleModelChange(e.target.value)}
          >
            <option value="">Select Model</option>
            {provider.models.map(m => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Language Dropdown */}
      {model && (
        <div>
          <label className="block font-medium mb-1">Language</label>
          <select
            className="w-full p-2 border rounded bg-black"
            value={language?.value || ''}
            onChange={e => handleLanguageChange(e.target.value)}
          >
            <option value="">Select Language</option>
            {model.languages.map(l => (
              <option key={l.value} value={l.value}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Summary Card */}
      {provider && model && language && (
        <div className="p-4 border rounded bg-white shadow mt-4">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <ul className="space-y-1">
            <li>
              <strong>Provider:</strong> {provider.name} (<code>{provider.value}</code>)
            </li>
            <li>
              <strong>Model:</strong> {model.name} (<code>{model.value}</code>)
            </li>
            <li>
              <strong>Language:</strong> {language.name} (<code>{language.value}</code>)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
