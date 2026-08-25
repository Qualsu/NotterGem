"use client";

import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createOrder } from "@/app/api/order/order";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { getById as getOrg } from "@/app/api/orgs/org";
import { getById as getUser } from "@/app/api/users/user";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pages } from "@/config/routing/pages.route";
import { images } from "@/config/routing/image.route";
import type { PriceCalculation } from "@/config/types/components.types";
import type { Org, User } from "@/config/types/api.types";
import { getPlanLimits } from "@/lib/plan-limits";

export default function BuyPremium() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<string | null>("2");
    const { organization } = useOrganization();
    const { user, isSignedIn, isLoaded } = useUser();
    const isOrg = organization?.id !== undefined;
    const id = isOrg ? organization.id : user?.id;
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<User | Org | null>(null);

    const basePrices: { [key: string]: number } = {
        "1": isOrg ? 149 : 29,
        "2": isOrg ? 299 : 99,
    };

    const calculatePrice = (): PriceCalculation => {
        if (!selectedPlan) return { price: 0, oldPrice: 0 };

        let price = basePrices[selectedPlan];
        let oldPrice = 0;

        if (profile?.premium === 1 && selectedPlan === "2") {
            price -= basePrices["1"];
            oldPrice = basePrices["2"];
        }

        return { price: price > 0 ? price : 0, oldPrice };
    };

    const canPurchasePlan = () => {
        if (profile?.premium === 1 && selectedPlan === "1") {
            toast.error("Вы уже приобрели тариф Amber.");
            return false;
        }
        if (profile?.premium === 2 && selectedPlan === "2") {
            toast.error("Вы уже приобрели тариф Diamond.");
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push(pages.AUTH);
        }

        const fetchProfile = async () => {
            if (id) {
                if (isOrg) {
                    const orgProfile = await getOrg(id);
                    setProfile(orgProfile);
                } else {
                    const userProfile = await getUser(id);
                    setProfile(userProfile);
                }
            }
        };

        fetchProfile();
    }, [id, isOrg, isSignedIn, isLoaded, router]);

    const handlePayment = async () => {
        if (!selectedPlan) {
            toast.error("Пожалуйста, выберите тариф");
            return;
        }

        if (!canPurchasePlan()) {
            return;
        }

        setLoading(true);
        const { price } = calculatePrice();

        const orderResponse = id ? await createOrder(id, parseInt(selectedPlan), "pending", price) : null;
        const paymentUrl = typeof orderResponse === "string" ? orderResponse : orderResponse?.payment_url;

        if (typeof paymentUrl === "string" && paymentUrl.length > 0) {
            window.location.href = paymentUrl;
            return;
        } else {
            toast.error("Произошла ошибка при создании заказа");
        }
        setLoading(false);
    };

    const getCurrentPlan = (): string => {
        if (!profile) return "Free";
        switch (profile.premium) {
            case 1:
                return "Amber";
            case 2:
                return "Diamond";
            default:
                return "Free";
        }
    };

    return (
        <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 pt-20 pb-8">
            <div className="relative w-full max-w-5xl my-auto">

                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 rounded-3xl border border-white/40 bg-white/70 dark:border-white/10 dark:bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
                    {/* LEFT COLUMN: TARIFFS & FEATURES */}
                    <section className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                <span className="bg-gradient-to-r from-logo-yellow to-logo-light-yellow bg-clip-text text-transparent">Notter </span>
                                <span className="text-logo-cyan">Gem</span>
                            </h1>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Единая подписка для <b>Notter</b> и <b>Notter ToDo</b>
                        </p>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            <PlanCard
                                id="1"
                                title="Amber"
                                price={isOrg ? 149 : 29}
                                icon={images.BADGE.AMBER}
                                isOrg={isOrg}
                                selected={selectedPlan === "1"}
                                onSelect={() => setSelectedPlan("1")}
                            />

                            <PlanCard
                                id="2"
                                title="Diamond"
                                price={isOrg ? 299 : 99}
                                icon={images.BADGE.DIAMOND}
                                isOrg={isOrg}
                                selected={selectedPlan === "2"}
                                onSelect={() => setSelectedPlan("2")}
                            />
                        </div>
                    </section>

                    {/* RIGHT COLUMN: CHECKOUT */}
                    <aside className="lg:col-span-5 flex flex-col justify-between bg-card/60 dark:bg-zinc-900/60 backdrop-blur rounded-2xl p-6 border border-border/40">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-bold">Оплата</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">Аккаунт / Организация</p>
                                <div className="mt-2">
                                    <OrganizationSwitcher />
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-border/40 pt-3">
                                <div className="text-sm text-muted-foreground">Текущий план</div>
                                <div className="font-semibold text-sm">{getCurrentPlan()}</div>
                            </div>

                            <div className="flex items-center justify-between border-t border-border/40 pt-3">
                                <div className="text-sm text-muted-foreground">Выбранный тариф</div>
                                <div className="text-base font-bold text-foreground">
                                    {selectedPlan === "1" ? "Amber" : selectedPlan === "2" ? "Diamond" : "—"}
                                </div>
                            </div>

                            <div className="border-t border-border/40 pt-3 space-y-1">
                                <div className="text-xs text-muted-foreground">Итого к оплате</div>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-3xl font-extrabold">{calculatePrice().price} ₽</div>
                                    {calculatePrice().oldPrice > 0 && (
                                        <div className="text-sm line-through text-muted-foreground font-medium">
                                            {calculatePrice().oldPrice} ₽
                                        </div>
                                    )}
                                </div>
                                <div className="text-[11px] text-muted-foreground">Единоразово навсегда</div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border/40">
                            <Button onClick={handlePayment} className="w-full h-11 text-sm font-bold" disabled={loading || !selectedPlan}>
                                {loading ? "Ожидание..." : "Оплатить"}
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function PlanCard({
    id,
    title,
    price,
    icon,
    isOrg,
    selected,
    onSelect,
}: {
    id: string;
    title: string;
    price: number;
    icon?: string;
    isOrg: boolean;
    selected: boolean;
    onSelect: () => void;
}) {
    const limits = getPlanLimits(Number(id), isOrg);

    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                selected
                    ? "border-primary ring-2 ring-primary/20 bg-card"
                    : "border-border/60 hover:border-border/90 bg-card/70 dark:bg-zinc-900/60"
            }`}
        >
            <div>
                {/* Header */}
                <div className="flex items-center gap-3">
                    {icon && <Image src={icon} alt={title} width={38} height={38} />}
                    <div>
                        <div className="text-base font-bold text-foreground">{title}</div>
                        <div className="text-xs text-muted-foreground font-medium">{price}₽ / навсегда</div>
                    </div>
                </div>

                {/* Features List */}
                <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                    {/* Notter Features */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-foreground text-[11px]">
                            <Image
                                src={images.IMAGE.DARK_ICON}
                                alt="Notter"
                                width={13}
                                height={13}
                            />
                            <span>В Notter:</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5">
                            <li>До {limits.documents} заметок</li>
                            <li>До {limits.publicDocuments} публичных страниц</li>
                            <li>Загрузка до {limits.uploadMb} МБ</li>
                            {title === "Amber" ? (
                                <li>Сокращенные ссылки</li>
                            ) : (
                                <>
                                    <li>Кастомные ссылки</li>
                                    <li>Без упоминаний Notter</li>
                                    <li>Экспорт заметок в JSON</li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Notter ToDo Features */}
                    <div className="space-y-1 pt-1 border-t border-border/30">
                        <div className="flex items-center gap-1.5 font-semibold text-foreground text-[11px]">
                            <Image
                                src={images.IMAGE.TODO_ICON}
                                alt="Notter ToDo"
                                width={13}
                                height={13}
                                className="rounded-xs"
                            />
                            <span>В Notter ToDo:</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5">
                            <li>
                                {typeof limits.todo.boards === "number"
                                    ? `До ${limits.todo.boards} досок`
                                    : `${limits.todo.boards} досок`}
                            </li>
                            <li>До {limits.todo.publicBoards} публичных досок</li>
                            <li>Расширенный журнал аудита</li>
                            <li>Кастомные фоны досок</li>
                            {title === "Diamond" && (
                                <>
                                    <li>Экспорт и импорт досок</li>
                                    <li>Экспорт журнала</li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* General / Profile */}
                    <div className="pt-1 border-t border-border/30 text-[11px]">
                        <span>✨ Значок <b>{title}</b> в профиле</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-2">
                <div
                    className={`w-full py-1 rounded-lg text-center text-xs font-semibold transition ${
                        selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-muted-foreground"
                    }`}
                >
                    {selected ? "Выбран" : "Выбрать"}
                </div>
            </div>
        </div>
    );
}
