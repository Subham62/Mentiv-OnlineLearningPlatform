import React from "react";
import { 
  Book, 
  Users, 
  Award, 
  Globe,
  Shield,
  FileText,
  Cookie,
  RefreshCw,
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Eye,
  UserCheck,
  CreditCard,
  Mail,
  Clock,
  Briefcase,
  DollarSign,
  Video,
  HeadphonesIcon,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-MentivPurple to-MentivPurple/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Information Center
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need to know about Mentiv
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* MENTIV SECTION */}
        <section id="mentiv">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Mentiv</h2>
            <div className="w-20 h-1 bg-MentivPurple"></div>
          </div>

          {/* About Us */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Book className="w-7 h-7 text-MentivPurple" />
                About Us
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Mentiv is a leading online learning platform dedicated to democratizing education and making 
                quality learning accessible to everyone, everywhere. Founded with the vision to bridge the gap 
                between knowledge seekers and expert educators, we've grown into a vibrant community of learners 
                and instructors from around the world.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our platform hosts thousands of courses across diverse fields including technology, business, 
                design, marketing, and personal development. Whether you're a beginner starting your learning 
                journey or a professional looking to upskill, Mentiv provides the tools, resources, and 
                community support you need to succeed.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <Users className="w-12 h-12 text-MentivPurple mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">100+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Active Learners</p>
                </div>
                <div className="text-center p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <Book className="w-12 h-12 text-MentivPurple mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">10+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Quality Courses</p>
                </div>
                <div className="text-center p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <Award className="w-12 h-12 text-MentivPurple mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">5+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Expert Instructors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Press & Blog */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-MentivPurple" />
                  Press & Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For press inquiries, media partnerships, or interview requests, please contact our 
                  communications team.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: <a href="mailto:press@mentiv.com" className="text-MentivPurple hover:underline">press@mentiv.com</a>
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-MentivPurple" />
                  Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Join our team and help shape the future of online education. We're always looking for 
                  talented individuals passionate about learning.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: <a href="mailto:careers@mentiv.com" className="text-MentivPurple hover:underline">careers@mentiv.com</a>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Help Center & Contact */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HeadphonesIcon className="w-6 h-6 text-MentivPurple" />
                  Help Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Need assistance? Our help center provides comprehensive guides, FAQs, and troubleshooting 
                  resources to help you get the most out of Mentiv.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Getting Started Guides
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Video Tutorials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    24/7 Support Portal
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-MentivPurple" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Have questions? Our support team is here to help you succeed on your learning journey.
                </p>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p>
                    <strong>Email:</strong> <a href="mailto:support@mentiv.com" className="text-MentivPurple hover:underline">support@mentiv.com</a>
                  </p>
                  <p>
                    <strong>Phone:</strong> <a href="tel:+919876543210" className="text-MentivPurple hover:underline">+91 98765 43210</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon-Fri: 9 AM - 6 PM IST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TEACH SECTION */}
        <section id="teach">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Teach on Mentiv</h2>
            <div className="w-20 h-1 bg-MentivPurple"></div>
          </div>

          {/* Become Instructor */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Briefcase className="w-7 h-7 text-MentivPurple" />
                Become an Instructor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Share your expertise with millions of learners worldwide. Whether you're an industry expert, 
                academic professional, or passionate educator, Mentiv provides the platform and tools you need 
                to create impactful courses and build your brand.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <DollarSign className="w-10 h-10 text-MentivPurple mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Earn Revenue</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get paid for your expertise with competitive revenue sharing
                  </p>
                </div>
                <div className="p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <Users className="w-10 h-10 text-MentivPurple mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reach students from over 150 countries worldwide
                  </p>
                </div>
                <div className="p-6 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <TrendingUp className="w-10 h-10 text-MentivPurple mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Build Your Brand</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Establish yourself as an industry thought leader
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Resources & Pricing */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-MentivPurple" />
                  Creator Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Access comprehensive resources to help you create engaging, high-quality courses.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Course creation templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Video production guides
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Marketing best practices
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Instructor community support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-MentivPurple" />
                  Pricing & Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Transparent pricing with no hidden fees. You focus on teaching, we handle the rest.
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong className="text-gray-900 dark:text-white">Revenue Share:</strong> 70% instructor, 30% platform
                  </li>
                  <li>
                    <strong className="text-gray-900 dark:text-white">No Upfront Costs:</strong> Free to create and publish courses
                  </li>
                  <li>
                    <strong className="text-gray-900 dark:text-white">Monthly Payouts:</strong> Receive earnings via bank transfer
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Affiliates */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-MentivPurple" />
                Affiliate Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Earn commission by promoting Mentiv courses. Join our affiliate program and get rewarded 
                for every student you refer.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <p className="text-2xl font-bold text-MentivPurple mb-1">10%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Commission Rate</p>
                </div>
                <div className="text-center p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <p className="text-2xl font-bold text-MentivPurple mb-1">90 Days</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cookie Duration</p>
                </div>
                <div className="text-center p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                  <p className="text-2xl font-bold text-MentivPurple mb-1">Free</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Join Program</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* LEGAL SECTION */}
        <section id="legal">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Legal & Policies</h2>
            <div className="w-20 h-1 bg-MentivPurple"></div>
          </div>

          {/* Privacy Policy */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lock className="w-7 h-7 text-MentivPurple" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Data Collection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We collect information you provide directly (name, email, profile details) and automatically 
                  (device info, usage patterns, cookies) to improve your learning experience.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Data Usage</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your data helps us personalize courses, improve platform features, process payments, 
                  and communicate important updates. We never sell your personal information.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Data Protection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We use industry-standard encryption and security measures to protect your data. Our servers 
                  are secure, and we comply with GDPR and other international privacy regulations.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Your Rights</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Access and download your personal data
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Request data correction or deletion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Opt-out of marketing communications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Withdraw consent at any time
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="w-7 h-7 text-MentivPurple" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Account Responsibilities</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  You are responsible for maintaining account security and all activities under your account.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Keep your password secure and confidential
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Provide accurate registration information
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Do not share your account with others
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Do not use the platform for illegal activities
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Course Access</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Purchased courses grant lifetime access for personal use only. You may not redistribute, 
                  share, or resell course content without explicit permission.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Intellectual Property</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All course content, platform design, and materials are protected by copyright. Instructors 
                  retain rights to their content while granting Mentiv license to distribute.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Termination</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right to suspend or terminate accounts that violate our terms, engage in 
                  fraudulent activity, or abuse platform features.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Policy */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Cookie className="w-7 h-7 text-MentivPurple" />
                Cookie Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                and personalize content.
              </p>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Types of Cookies We Use</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Essential Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required for platform functionality, login sessions, and security features. Cannot be disabled.
                    </p>
                  </div>
                  <div className="p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us understand how visitors use our platform to improve user experience.
                    </p>
                  </div>
                  <div className="p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track browsing habits to show relevant ads and measure campaign effectiveness.
                    </p>
                  </div>
                  <div className="p-4 bg-MentivPurple/5 dark:bg-MentivPurple/10 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Preference Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remember your settings like language, theme, and display preferences.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Managing Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can control cookies through your browser settings. Note that blocking certain cookies 
                  may affect platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <RefreshCw className="w-7 h-7 text-MentivPurple" />
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <p className="text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  30-Day Money-Back Guarantee
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Eligibility</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  You can request a full refund within 30 days of purchase if:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    You've watched less than 30% of the course content
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    The course doesn't match its description
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    You experienced technical issues preventing access
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Non-Refundable</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Courses purchased more than 30 days ago
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Courses where you've completed more than 30% content
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Accounts with history of refund abuse
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Refund Process</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Contact our support team with your order details. Approved refunds are processed within 
                  5-10 business days to your original payment method.
                </p>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5 text-MentivPurple" />
                  <span>Average processing time: 5-7 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sitemap */}
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-MentivPurple" />
                Sitemap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Navigate our platform easily with our comprehensive sitemap listing all pages and resources.
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Learn</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>All Courses</li>
                    <li>Categories</li>
                    <li>Free Courses</li>
                    <li>New Releases</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Teach</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Become Instructor</li>
                    <li>Instructor Dashboard</li>
                    <li>Resources</li>
                    <li>Affiliate Program</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Company</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Press</li>
                    <li>Blog</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Help Center</li>
                    <li>Contact Us</li>
                    <li>FAQs</li>
                    <li>Community</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default InfoPage;
