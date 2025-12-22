import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Users, 
  DollarSign, 
  Award,
  ArrowRight,
  Clock,
  Loader2
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  useApplyToBeInstructorMutation, 
  useGetInstructorStatusQuery 
} from "@/features/api/instructorApi";

const BecomeInstructor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    expertise: "",
    experience: "",
    why: "",
  });
  
  const navigate = useNavigate();
  
  // RTK Query hooks
  const { data: statusData, isLoading: statusLoading } = useGetInstructorStatusQuery();
  const [applyToBeInstructor, { data, isLoading: isSubmitting, isSuccess, isError, error }] = useApplyToBeInstructorMutation();

  const isInstructor = statusData?.isInstructor || false;

  // Handle success/error with useEffect
  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Congratulations! You are now an instructor.");
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/admin/course");
      }, 1500);
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to submit application. Please try again.");
    }
  }, [isSuccess, isError, data, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyToBeInstructor(formData);
  };

  // Loading state
  if (statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#5A4BDA] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Already instructor
  if (isInstructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="max-w-2xl w-full dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl text-gray-900 dark:text-white">
              You're Already an Instructor!
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Start creating amazing courses and share your knowledge with students worldwide.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate("/admin/course")}
              className="w-full bg-[#5A4BDA] hover:bg-[#4a3bc0] text-white font-bold py-6 text-lg"
            >
              Go to Instructor Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full dark:border-gray-600 dark:text-gray-300"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-[#5A4BDA] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Become an Instructor Today
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Share your knowledge with millions of students worldwide and earn money doing what you love.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>Instant approval</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>No waiting period</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>Start teaching immediately</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Teach With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#5A4BDA] transition-colors dark:bg-gray-700 dark:border-gray-600">
              <CardHeader>
                <div className="w-12 h-12 bg-[#5A4BDA]/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#5A4BDA]" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Reach Millions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with over 100,000+ eager learners from around the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#5A4BDA] transition-colors dark:bg-gray-700 dark:border-gray-600">
              <CardHeader>
                <div className="w-12 h-12 bg-[#5A4BDA]/10 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-[#5A4BDA]" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Earn Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Get paid for every course enrollment. Set your own pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#5A4BDA] transition-colors dark:bg-gray-700 dark:border-gray-600">
              <CardHeader>
                <div className="w-12 h-12 bg-[#5A4BDA]/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#5A4BDA]" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Start Instantly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  No approval wait time. Become an instructor in under 2 minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Quick Instructor Registration
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Fill out this form and you'll be approved instantly to start teaching!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="dark:text-gray-300">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-300">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="dark:text-gray-300">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise" className="dark:text-gray-300">Area of Expertise *</Label>
                  <Input
                    id="expertise"
                    name="expertise"
                    required
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Data Science, UI/UX Design"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="dark:text-gray-300">Years of Experience *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 5 years"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="why" className="dark:text-gray-300">Why do you want to teach? *</Label>
                  <textarea
                    id="why"
                    name="why"
                    required
                    value={formData.why}
                    onChange={handleChange}
                    placeholder="Tell us about your motivation and teaching experience..."
                    rows={5}
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5A4BDA] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <strong>Instant Approval:</strong> Once you submit this form, you'll immediately become an instructor and can start creating courses right away!
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#5A4BDA] hover:bg-[#4a3bc0] text-white font-bold py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Become an Instructor Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#5A4BDA] mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#5A4BDA] mb-2">100K+</div>
              <div className="text-gray-600 dark:text-gray-400">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#5A4BDA] mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Courses Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#5A4BDA] mb-2">2 min</div>
              <div className="text-gray-600 dark:text-gray-400">Approval Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeInstructor;
