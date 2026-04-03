import Link from "next/link";
import { ArrowRight, Calendar, Users, Building, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto w-full py-16">
        <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">NomadBridge</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect digital nomads with Thai university communities. Join events, find collaboration opportunities, and book facilities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg hover:shadow-indigo-200"
            >
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/collaborations" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-indigo-600 bg-white border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 hover:scale-105 transition-all shadow-sm"
            >
              Find Collaborations
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 w-full">
          {[
            { name: "Events & RSVP", icon: Calendar, path: "/events", desc: "Discover and join community events" },
            { name: "Collaborations", icon: Users, path: "/collaborations", desc: "Offer skills and match with projects" },
            { name: "Facilities", icon: Building, path: "/facilities", desc: "Book university venues and spaces" },
            { name: "Forum", icon: MessageSquare, path: "/forum", desc: "Discuss and share knowledge" },
          ].map((feature, idx) => (
            <Link 
              href={feature.path} 
              key={feature.name} 
              className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${(idx + 1) * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
