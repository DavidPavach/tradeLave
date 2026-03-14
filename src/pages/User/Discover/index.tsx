import { useState, useEffect } from "react";

// Utils
import { formatDate } from "@/utils/format";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import { Calendar, ExternalLink, Filter, RefreshCw, Newspaper } from "lucide-react";



export default function Index() {

    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);

    const fetchNews = async () => {
        try {
            setError(null);
            const response = await fetch(
                "https://newsdata.io/api/1/latest?apikey=pub_4565c81c6da745b8bee34b94850ff8f0&q=cryptocurrency"
            );
            if (!response.ok) throw new Error("Failed to fetch news");

            const data = await response.json();
            setArticles(data.results || []);
        } catch (err) {
            setError("Failed to load cryptocurrency news. Please try again later.");
            console.error("Error fetching news:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchNews();
    };

    const filteredArticles = articles.filter((article) => {
        const matchesCategory =
            categoryFilter === "all" ||
            (article.category && article.category.includes(categoryFilter));

        return matchesCategory;
    });

    const getUniqueCategories = () => {
        const categories = new Set<string>();
        articles.forEach((article) => {
            article.category?.forEach((cat) => categories.add(cat));
        });
        return Array.from(categories).slice(0, 10);
    };

    if (loading) return <NewsLoadingSkeleton />;

    return (
        <div className="px-4 md:px-8 py-8">
            <div>
                <div className="mb-8">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                        <div>
                            <h1 className="flex items-center gap-3 font-bold text-lightBlack text-xl sm:text-2xl md:text-3xl xl:text-4xl">
                                Discovery
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Stay updated with the latest cryptocurrency news and market insights
                            </p>
                        </div>
                        <Button onClick={handleRefresh} disabled={refreshing} className="bg-primary hover:bg-primary/90">
                            <RefreshCw className={`size-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                            {refreshing ? "Refreshing..." : "Refresh"}
                        </Button>
                    </div>
                </div>

                <Card className="mb-6 border-border">
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-x-1">
                                Filter
                                <Filter className="size-4 text-muted-foreground" />
                            </span>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent className="text-xs md:text-sm xl:text-base">
                                    <SelectItem value="all" >All Categories</SelectItem>
                                    {getUniqueCategories().map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <Card className="bg-destructive/10 mb-6 border-destructive/20">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-red-700">
                                <Newspaper className="size-5" />
                                <p>{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {filteredArticles.length > 0 ? (
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles.map((article) => (
                            <NewsCard key={article.article_id} article={article} />
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <Card className="border-border">
                            <CardContent className="pt-6">
                                <div className="py-12 text-center">
                                    <Newspaper className="mx-auto mb-4 size-12 text-neutral-400" />
                                    <h3 className="mb-2 font-medium text-neutral-600 text-sm md:text-base xl:text-lg">
                                        No articles found
                                    </h3>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )}

                {filteredArticles.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground">
                            Showing {filteredArticles.length} of {articles.length} articles
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function NewsCard({ article }: { article: NewsArticle }) {
    return (
        <Card className="flex flex-col border-border h-full duration-200">
            {article.image_url && (
                <div className="rounded-t-lg aspect-video overflow-hidden">
                    <img src={article.image_url || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                        }}
                    />
                </div>
            )}

            <CardHeader className="flex-1">
                <div className="space-y-2">
                    {article.category && article.category.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {article.category.slice(0, 2).map((cat) => (
                                <Badge key={cat} className="bg-primary/20 hover:bg-primary/20 text-primary text-xs">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <CardTitle className="text-lightBlack text-sm md:text-base xl:text-lg line-clamp-2 leading-tight">
                        {article.title}
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 pt-0">
                <p className="flex-1 mb-4 text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3">
                    {article.description}
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-muted-foreground text-xs">
                        <div className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            <span>{formatDate(new Date(article.pubDate))}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Newspaper className="size-3" />
                            <span className="max-w-25 truncate">{article.source_id}</span>
                        </div>
                    </div>

                    <Button asChild className="bg-primary hover:bg-primary/90 w-full text-black">
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2">
                            Read Full Article
                            <ExternalLink className="size-4" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function NewsLoadingSkeleton() {
    return (
        <div className="px-4 md:px-8 py-8">
            <div>
                <div className="mb-8">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                        <div>
                            <Skeleton className="mb-2 w-64 h-10" />
                            <Skeleton className="w-96 h-4" />
                        </div>
                        <Skeleton className="w-32 h-10" />
                    </div>
                </div>

                <Card className="mb-6 border-border">
                    <CardContent className="pt-6">
                        <div className="flex md:flex-row flex-col gap-4">
                            <Skeleton className="flex-1 h-10" />
                            <Skeleton className="w-48 h-10" />
                        </div>
                    </CardContent>
                </Card>

                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="border-border">
                            <Skeleton className="rounded-t-lg aspect-video" />
                            <CardHeader>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <Skeleton className="w-16 h-5" />
                                        <Skeleton className="w-20 h-5" />
                                    </div>
                                    <Skeleton className="w-full h-6" />
                                    <Skeleton className="w-3/4 h-6" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-2 mb-4">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-2/3 h-4" />
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <Skeleton className="w-24 h-3" />
                                    <Skeleton className="w-20 h-3" />
                                </div>
                                <Skeleton className="w-full h-10" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
