// ─── ERROR BOUNDARY ────────────────────────────────────────────────────────────
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App error caught by boundary:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: '#0E0C0A' }}>
        <div className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F43F5E20', border: '1px solid #F43F5E40' }}>
          <span className="text-2xl">⚠</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          Something went wrong
        </h1>
        <p className="text-white/40 text-sm mb-8 max-w-sm">
          Your progress is saved. Tap below to go back to the home screen.
        </p>
        <button
          onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ backgroundColor: '#06B6D4', color: '#0E0C0A' }}
        >
          Back to Home
        </button>
        {import.meta.env.DEV && (
          <pre className="mt-8 text-left text-red-400/60 text-xs max-w-lg overflow-auto">
            {this.state.error?.toString()}
          </pre>
        )}
      </div>
    );
  }
}
